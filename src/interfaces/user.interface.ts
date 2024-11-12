

export interface User{
uid:string;
// image?:string;
name:string;
email:string;
password?:string;
state:boolean;
phone:string;
unidad:'UPGD'|'UI';
role:'ADMIN'|'OPERARIO'|'USUARIO';
createdAt?:String;
}

// interface Unidad{
//     name?:string;
//     cod:string;

// }