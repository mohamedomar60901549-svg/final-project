export default function ChatHeader({

    user,

    online

}) {

    if (!user) return null;

    return (

        <div className="bg-white border-b p-4 flex items-center gap-4">

            <div className="relative">

                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">

                    {

                        user.full_name
                            .charAt(0)
                            .toUpperCase()

                    }

                </div>

                {

                    online && (

                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>

                    )

                }

            </div>

            <div>

                <h2 className="font-bold text-lg">

                    {user.full_name}

                </h2>

                <p className="text-sm text-gray-500">

                    {

                        online

                        ?

                        "Online"

                        :

                        "Offline"

                    }

                </p>

            </div>

        </div>

    );

}