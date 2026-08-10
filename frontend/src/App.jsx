import { useEffect, useState, useCallback } from 'react';
import BrewCard from './components/BrewCard';
import MethodFilter from './components/MethodFilter';
import BrewFormModal from './components/BrewFormModal';
import { fetchBrews, createBrew, updateBrew, deleteBrew } from './api/brews';

export default function App() {
  const [brews, setBrews] = useState([]);
  const [methodFilter, setMethodFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
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

  return (
    <div className="mx-auto min-h-screen max-w-md bg-white px-5 py-8 shadow-sm sm:my-8 sm:rounded-3xl sm:border sm:border-coffee-100">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-coffee-900">Brew log</h1>
          <p className="text-sm text-coffee-600">Brews: {brews.length}</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="rounded-lg bg-coffee-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-coffee-800"
        >
          Add
        </button>
      </header>

      <div className="mb-4">
        <MethodFilter value={methodFilter} onChange={setMethodFilter} />
      </div>

      {loading && <p className="py-8 text-center text-sm text-coffee-600">Loading brews…</p>}

      {!loading && loadError && (
        <p className="py-8 text-center text-sm text-red-600">{loadError}</p>
      )}

      {!loading && !loadError && brews.length === 0 && (
        <p className="py-8 text-center text-sm text-coffee-600">
          No brews yet. Tap "Add" to log your first one.
        </p>
      )}

      {!loading && !loadError && brews.length > 0 && (
        <ul>
          {brews.map((brew) => (
            <BrewCard key={brew.id} brew={brew} onEdit={openEditModal} />
          ))}
        </ul>
      )}

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
