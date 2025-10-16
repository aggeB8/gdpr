import {useState} from 'react';

export default function EditProfileModal({
    user,
    isOpen,
    onClose,
    onSave
}) {
    const [formData, setFormData] = useState({
        name:user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    }
    if (!isOpen) return null;
    return (
        <div className="fixed-inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className='bg-white rounded-xl max-w-md w-full max-4 p-6'  >
                <div className="flex justify-between items-center mb-6">
                    <h2 className='text-xl font-bold'>Redigera Profile</h2>

                    <button onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                    >X
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Namn</label>

                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        maxLength={50}
                    />
                     </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Användarnamn</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full border-gray-30 roundet-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                maxLength={30}
                                />
                        </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            rows={3}
                            maxLength={160}
                            placeholder='Skriv något om dig själv...'
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plats</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            maxLength={30}
                            placeholder='Din plats'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Webbsida</label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:text-gray-800 transition-colors"
                        >Avbryt
                        </button>
                        <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        >Spara
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
/*MODAL-KOMPONENT
1. ÖPPNA: Parent sätter isOpen={true}
2. VISA: Modal renderas över huvdinnehållet  
3. REDIGERA: Användaren ändrar fält, formData uppdateras
4. SPARA: handleSubmit anropas, data skickas till parent
5. STÄNG: onClose anropas, parent sätter isOpen={false}

VARFÖR DENNA DESIGN?
- CONTROLLED COMPONENT: Parent kontrollerar när modalen visas
- FORM VALIDATION: HTML5 validering + maxLength begränsningar
- USER EXPERIENCE: Tydliga knappar och feedback
- ACCESSIBILITY: Semantiska HTML-element
- RESPONSIVE: Fungerar på olika skärmstorlekar
*/