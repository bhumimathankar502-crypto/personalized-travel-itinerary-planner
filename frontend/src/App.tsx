import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TripWizard } from './components/TripWizard';
import { ItineraryView } from './components/ItineraryView';
import { DestinationSpotlight } from './components/DestinationSpotlight';
import { SavedTripsModal } from './components/SavedTripsModal';
import { ExportShareModal } from './components/ExportShareModal';
import { Trip, TripCreateInput, HealthStatus } from './types';
import { 
  generateTrip, getSavedTrips, saveTripLocally, 
  deleteTrip, regenerateTrip, checkBackendHealth 
} from './services/api';
import { Compass, Sparkles, Heart } from 'lucide-react';

export function App() {
  const [activeView, setActiveView] = useState<'wizard' | 'itinerary'>('wizard');
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [destinationParam, setDestinationParam] = useState('');
  const [health, setHealth] = useState<HealthStatus | null>(null);

  // Initialize data on mount
  useEffect(() => {
    checkBackendHealth().then(setHealth);
    getSavedTrips().then(trips => {
      setSavedTrips(trips);
      // If user had a previously viewed trip, load it
      if (trips.length > 0 && !currentTrip) {
        // Keep in wizard view by default, but ready in saved list
      }
    });
  }, []);

  const handleGenerate = async (input: TripCreateInput) => {
    setIsLoading(true);
    try {
      const trip = await generateTrip(input);
      setCurrentTrip(trip);
      setActiveView('itinerary');
      // Refresh saved trips
      const updated = await getSavedTrips();
      setSavedTrips(updated);
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRegenerateCurrent = async () => {
    if (!currentTrip) return;
    setIsLoading(true);
    try {
      const regenerated = await regenerateTrip(currentTrip.id, {
        destination: currentTrip.destination,
        start_date: currentTrip.start_date,
        end_date: currentTrip.end_date,
        total_budget: currentTrip.total_budget_inr,
        travelers_count: currentTrip.travelers_count,
        travel_style: currentTrip.travel_style,
        interests: [],
        notes: currentTrip.notes
      });
      setCurrentTrip(regenerated);
      const updated = await getSavedTrips();
      setSavedTrips(updated);
    } catch (err) {
      console.error('Regeneration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCurrent = () => {
    if (currentTrip) {
      saveTripLocally(currentTrip);
      getSavedTrips().then(setSavedTrips);
    }
  };

  const handleDeleteSavedTrip = async (tripId: string) => {
    await deleteTrip(tripId);
    setSavedTrips(prev => prev.filter(t => t.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
      setActiveView('wizard');
    }
  };

  const handleQuickSelectDestination = (dest: string) => {
    setDestinationParam(dest);
    setActiveView('wizard');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    setActiveView('wizard');
    const el = document.getElementById('explore-destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 antialiased">
      {/* Navigation */}
      <Navbar
        onNewTrip={() => {
          setActiveView('wizard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onExploreClick={handleExploreClick}
        savedCount={savedTrips.length}
        health={health}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        {activeView === 'wizard' ? (
          <div>
            <HeroBanner
              onQuickSelect={handleQuickSelectDestination}
              onStartPlanning={() => window.scrollTo({ top: 350, behavior: 'smooth' })}
            />

            <TripWizard
              initialDestination={destinationParam}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            <div id="explore-destinations">
              <DestinationSpotlight
                onSelectDestination={handleQuickSelectDestination}
              />
            </div>
          </div>
        ) : (
          currentTrip && (
            <ItineraryView
              trip={currentTrip}
              onBack={() => setActiveView('wizard')}
              onRegenerate={handleRegenerateCurrent}
              onSave={handleSaveCurrent}
              onUpdateTrip={(updated) => {
                setCurrentTrip(updated);
                saveTripLocally(updated);
              }}
              onExport={() => setIsExportModalOpen(true)}
            />
          )
        )}
      </main>

      {/* Modals */}
      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        trips={savedTrips}
        onSelectTrip={(trip) => {
          setCurrentTrip(trip);
          setActiveView('itinerary');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDeleteTrip={handleDeleteSavedTrip}
      />

      {currentTrip && (
        <ExportShareModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          trip={currentTrip}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">YatraAI</span>
            <span>— Personalized Travel Itinerary Planner</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Market: India (INR ₹)</span>
            <span>•</span>
            <span>React + FastAPI + Supabase + AI</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian travelers
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
