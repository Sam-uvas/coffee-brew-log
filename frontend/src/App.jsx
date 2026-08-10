import { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import MethodFilter from './components/MethodFilter';
import BrewCard from './components/BrewCard';
import BrewFormModal from './components/BrewFormModal';
import EmptyState from './components/EmptyState';
import { fetchBrews, createBrew, updateBrew, deleteBrew } from './api/brews';

export default function App() {
  const [brews, setBrews] = useState([]);
  const [methodFilter, setMethodFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrew, setEditingBrew] = useState(null);

  const loadBrews = useCallback(async (method) => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await fetchBrews(method || undefined);
      setBrews(data);
    } catch (err) {
      setLoadError(err.message || 'Failed to load brews.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrews(methodFilter);
  }, [methodFilter, loadBrews]);

  // Page title requirement: "Brews: {brewCount}"
  useEffect(() => {
    document.title = `Brews: ${brews.length}`;
  }, [brews.length]);

  function openAddModal() {
    setEditingBrew(null);
    setModalOpen(true);
  }

  function openEditModal(brew) {
    setEditingBrew(brew);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingBrew(null);
  }

  async function handleSave(formData) {
    if (editingBrew) {
      await updateBrew(editingBrew.id, formData);
    } else {
      await createBrew(formData);
    }
    closeModal();
    await loadBrews(methodFilter);
  }

  async function handleDelete(id) {
    await deleteBrew(id);
    closeModal();
    await loadBrews(methodFilter);
  }

  // Quick-delete straight from a card, bypassing the modal.
  async function handleQuickDelete(brew) {
    const confirmed = window.confirm(`Delete "${brew.beans}" from your brew journal?`);
    if (!confirmed) return;
    setActionError('');
    try {
      await deleteBrew(brew.id);
      await loadBrews(methodFilter);
    } catch (err) {
      setActionError(err.message || 'Could not delete that brew. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Header onNewBrew={openAddModal} />

        <div className="mt-8">
          <MethodFilter value={methodFilter} onChange={setMethodFilter} />
        </div>

        {actionError && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{actionError}</p>
        )}

        <div className="mt-8">
          {loading && (
            <p className="py-16 text-center text-sm text-espresso-400">Loading brews…</p>
          )}

          {!loading && loadError && (
            <p className="py-16 text-center text-sm text-red-600">{loadError}</p>
          )}

          {!loading && !loadError && brews.length === 0 && <EmptyState onNewBrew={openAddModal} />}

          {!loading && !loadError && brews.length > 0 && (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {brews.map((brew, index) => (
                <BrewCard
                  key={brew.id}
                  brew={brew}
                  onEdit={openEditModal}
                  onDelete={handleQuickDelete}
                  style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {modalOpen && (
        <BrewFormModal
          brew={editingBrew}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
