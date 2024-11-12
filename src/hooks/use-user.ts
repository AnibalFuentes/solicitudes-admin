'use client'
import { User } from "@/interfaces/user.interface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setInLocalstorage } from "../../actions/set-in-localstorage";
import { getFromLocalstorage } from "../../actions/get-from-localstorage";

export const useUser = (): { user: User | undefined; users: User[] | undefined } => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  const pathName = usePathname();
  const router = useRouter();

  const protectedRoutes = ['/sign-up', '/dashboard', '/dashboard/users', '/dashboard/requests'];
  const isInProtectedRoute = protectedRoutes.includes(pathName);

  const getUserFromDB = async (uid: string) => {
    const path = `users/users`; // Ruta al documento que contiene el array de usuarios

    try {
      // Obtiene el documento que contiene el array de usuarios
      const res = await getDocument(path);

      // Verifica si el documento tiene el array 'users' y encuentra el usuario con el UID dado
      const user = res?.users?.find((u: any) => u.uid === uid);
      console.log(user);

      if (user) {
        // Almacena el usuario logueado en el estado y en el localStorage
        setUser(user);
        setInLocalstorage('user', user);

        // Si el usuario es ADMIN, almacena todo el arreglo de usuarios en el estado y en localStorage
        if (user.role === 'ADMIN' && Array.isArray(res?.users)) {
          setUsers(res?.users as User[]); // Almacena todos los usuarios en el estado
          setInLocalstorage('users', res?.users); // Almacena todos los usuarios en localStorage
        }
      } else {
        console.error('Usuario no encontrado');
      }
    } catch (error: unknown) {
      console.error('Error al obtener el usuario:', error);
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userInLocal = getFromLocalstorage('user');
        if (userInLocal) setUser(userInLocal);
        else getUserFromDB(authUser.uid);
      } else {
        if (isInProtectedRoute) router.push('/');
      }
    });
  }, []);

  return { user, users };
};
