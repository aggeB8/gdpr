import React, { useState } from "react"
import { useAuth } from "../Context/AuthContext.jsx"
import axiosClient from "../api/axiosClient"

const SettingsPage = () => {
    const { user, logout } = useAuth()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [showUserData, setShowUserData] = useState(false)
    const [exportFormat, setExportFormat] = useState("json")
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState("")

    // GDPR Article 15 - Right to Access Personal Data
    const handleViewMyData = async () => {
        console.log(user)
        try {
            setLoading(true)
            const response = await axiosClient.get(`/gdpr/users/${user.id}/data-access`)
            setUserData(response.data)
            console.log(response.data)
            setShowUserData(true)
        } catch (error) {
            console.error("Error fetching user data:", error)
            alert("Fel vid hämtning av användardata: " + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    // GDPR Article 20 - Right to Data Portability
    const handleExportData = async () => {
        try {
            setLoading(true)
            const response = await axiosClient.get(
                `/gdpr/users/${user.id}/export?format=${exportFormat}`,
                { responseType: "blob" }
            )

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute(
                "download",
                `my-data-${new Date().toISOString().split("T")[0]}.${exportFormat}`
            )
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)

            alert("Data exporterad framgångsrikt!")
        } catch (error) {
            console.error("Error exporting data:", error)
            alert("Fel vid export av data: " + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    // GDPR Article 17 - Right to Erasure (Right to be Forgotten)
    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== "DELETE MY ACCOUNT") {
            alert('Du måste skriva "DELETE MY ACCOUNT" för att bekräfta borttagning.')
            return
        }

        try {
            setLoading(true)
            await axiosClient.delete(`/gdpr/users/${user.id}/account`)
            alert("Ditt konto har tagits bort. Du loggas nu ut.")
            logout()
        } catch (error) {
            console.error("Error deleting account:", error)
            alert("Fel vid borttagning av konto: " + error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const formatUserData = (data) => {
        return (
            <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Profilinformation</h4>
                    <p>
                        <strong>Användarnamn:</strong> {data.user?.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {data.user?.email}
                    </p>
                    <p>
                        <strong>Skapat:</strong>{" "}
                        {new Date(data.user.createdAt).toLocaleDateString("sv-SE")}
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">
                        Yaps ({data.yaps?.length || 0})
                    </h4>
                    {data.yaps && data.yaps.length > 0 ? (
                        <div className="max-h-40 overflow-y-auto space-y-2">
                            {data.yaps.map((yap, index) => (
                                <div key={index} className="text-sm border-b pb-1">
                                    <p className="truncate">{yap.content}</p>
                                    <p className="text-gray-500 text-xs">
                                        {new Date(yap.createdAt).toLocaleDateString(
                                            "sv-SE"
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Inga yaps hittades</p>
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">
                        Gillningar ({data.likes?.length || 0})
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Du har gillat {data.likes?.length || 0} yaps
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">
                        Svar ({data.replies?.length || 0})
                    </h4>
                    {data.replies && data.replies.length > 0 ? (
                        <div className="max-h-40 overflow-y-auto space-y-2">
                            {data.replies.map((reply, index) => (
                                <div key={index} className="text-sm border-b pb-1">
                                    <p className="truncate">{reply.content}</p>
                                    <p className="text-gray-500 text-xs">
                                        {new Date(reply.createdAt).toLocaleDateString(
                                            "sv-SE"
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Inga svar hittades</p>
                    )}
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Du måste vara inloggad för att komma åt inställningar.
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                        GDPR Inställningar & Datasäkerhet
                    </h1>

                    <div className="space-y-8">
                        {/* GDPR Article 15 - Right of Access */}
                        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                📋 Visa Mina Data (GDPR Artikel 15)
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Enligt GDPR Artikel 15 har du rätt att få tillgång till
                                all personlig data vi har om dig.
                            </p>
                            <button
                                onClick={handleViewMyData}
                                disabled={loading}
                                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                            >
                                {loading ? "Laddar..." : "Visa Mina Data"}
                            </button>
                        </div>

                        {/* Show User Data */}
                        {showUserData && userData && (
                            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        Dina Lagrade Data
                                    </h3>
                                    <button
                                        onClick={() => setShowUserData(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        ✕
                                    </button>
                                </div>
                                {formatUserData(userData)}
                            </div>
                        )}

                        {/* GDPR Article 20 - Right to Data Portability */}
                        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                📥 Exportera Mina Data (GDPR Artikel 20)
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Enligt GDPR Artikel 20 har du rätt att få dina data i ett
                                portabelt format.
                            </p>
                            <div className="flex items-center space-x-4 mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="json"
                                        checked={exportFormat === "json"}
                                        onChange={(e) => setExportFormat(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        JSON Format
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="csv"
                                        checked={exportFormat === "csv"}
                                        onChange={(e) => setExportFormat(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        CSV Format
                                    </span>
                                </label>
                            </div>
                            <button
                                onClick={handleExportData}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                            >
                                {loading
                                    ? "Exporterar..."
                                    : `Exportera som ${exportFormat.toUpperCase()}`}
                            </button>
                        </div>

                        {/* GDPR Article 17 - Right to Erasure */}
                        <div className="border border-red-200 dark:border-red-600 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
                            <h2 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4">
                                🗑️ Radera Mitt Konto (GDPR Artikel 17)
                            </h2>
                            <p className="text-red-600 dark:text-red-400 mb-4">
                                Enligt GDPR Artikel 17 har du "rätten att bli glömd".
                                Detta tar bort ALL din data permanent.
                            </p>

                            {!showDeleteConfirmation ? (
                                <button
                                    onClick={() => setShowDeleteConfirmation(true)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Radera Mitt Konto
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg border border-red-300 dark:border-red-600">
                                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                                            ⚠️ VARNING
                                        </h4>
                                        <p className="text-red-700 dark:text-red-300 text-sm mb-2">
                                            Denna åtgärd kan INTE ångras! All din data
                                            kommer att tas bort permanent:
                                        </p>
                                        <ul className="text-red-700 dark:text-red-300 text-sm list-disc ml-6">
                                            <li>Ditt användarkonto och profil</li>
                                            <li>Alla dina yaps och kommentarer</li>
                                            <li>
                                                Alla dina gillningar och interaktioner
                                            </li>
                                            <li>All annan associerad data</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                                            Skriv "DELETE MY ACCOUNT" för att bekräfta:
                                        </label>
                                        <input
                                            type="text"
                                            value={deleteConfirmText}
                                            onChange={(e) =>
                                                setDeleteConfirmText(e.target.value)
                                            }
                                            className="w-full p-3 border border-red-300 dark:border-red-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="DELETE MY ACCOUNT"
                                        />
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={
                                                loading ||
                                                deleteConfirmText !== "DELETE MY ACCOUNT"
                                            }
                                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            {loading ? "Raderar..." : "RADERA MITT KONTO"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowDeleteConfirmation(false)
                                                setDeleteConfirmText("")
                                            }}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            Avbryt
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* GDPR Information */}
                        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
                            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
                                ℹ️ Om GDPR och Dina Rättigheter
                            </h2>
                            <div className="text-blue-700 dark:text-blue-300 space-y-2">
                                <p>
                                    <strong>Artikel 15:</strong> Rätt till tillgång - Du
                                    kan begära kopior av dina personuppgifter.
                                </p>
                                <p>
                                    <strong>Artikel 17:</strong> Rätten att bli glömd - Du
                                    kan begära att vi raderar dina personuppgifter.
                                </p>
                                <p>
                                    <strong>Artikel 20:</strong> Dataportabilitet - Du kan
                                    begära dina data i ett maskinläsbart format.
                                </p>
                                <p>
                                    <strong>Artikel 32:</strong> Säkerhet - Vi
                                    implementerar lämpliga säkerhetsåtgärder för att
                                    skydda dina data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
