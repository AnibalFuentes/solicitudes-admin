'use client'
import { User } from "@/interfaces/user.interface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setInLocalstorage } from "../../actions/set-in-localstorage";
import { getFromLocalstorage } from "../../actions/get-from-localstorage";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined); // Estado para la lista de usuarios

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = res?.users?.find((u: any) => u.uid === uid);
      console.log(user);

      if (user) {
        // Almacena el usuario logueado en el estado y en el localStorage
        setUser(user);
        setInLocalstorage('user', user);
        
        // Si el rol es 'ADMIN', almacena la lista de usuarios en el estado
        if (user.role === "ADMIN") {
          setUsers(res?.users || []);
          // setInLocalstorage('users', res?.users||[]);
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
        const usersInLocal = getFromLocalstorage('users'); // Trae la lista de usuarios del localStorage

        if (userInLocal) setUser(userInLocal);
        if (usersInLocal) setUsers(usersInLocal); // Si hay una lista en el localStorage, la establece

        if (!userInLocal || !usersInLocal) {
          await getUserFromDB(authUser.uid); // Si no hay usuario o lista en el localStorage, obtiene los datos desde la base de datos
        }
      } else {
        if (isInProtectedRoute) router.push('/');
      }
    });
  }, [isInProtectedRoute, router]);

  return { user, users }; // Retorna tanto el usuario como la lista de usuarios solo si es ADMIN
};
