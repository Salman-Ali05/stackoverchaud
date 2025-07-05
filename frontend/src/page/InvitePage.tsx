export const InvitePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold mb-2">
            Invitation
          </h1>
          <p className="text-slate-600">Inviter un utilisateur à utiliser Eduresa</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form>
            <input
              type="email"
              placeholder="Votre e-mail"
              className="w-full p-3 border border-slate-300 rounded mb-4"
            />
            <select
              name='dropdown'
              className="w-full p-3 border border-slate-300 rounded mb-4"
            >
              <option value="" disabled selected>Role de l'utilisateur</option>
              <option value="Structure">Structure</option>
              <option value="Professeurs">Professeurs</option>
              <option value="Etudiants">Etudiants</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
            >
              Envoyer l'invitation
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}