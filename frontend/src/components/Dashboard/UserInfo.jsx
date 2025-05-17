import Image from 'next/image';

export default function UserInfo() {
  const user = {
    username: 'mario',
    nome: 'Mario Rossi',
    ruolo: 'Tecnico',
    email: 'mario@simai.local',
    immagineProfilo: '/mario.png', // Assicurati che l'immagine sia in public/
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4">
      <Image
        src={user.immagineProfilo}
        alt="Foto profilo"
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold">{user.nome}</h2>
        <p className="text-sm text-gray-500">{user.ruolo}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
  );
}
