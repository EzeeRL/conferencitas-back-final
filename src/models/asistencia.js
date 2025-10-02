/* Control de Entrada
Buscar por ID
ID	Niño/a	Responsable	Celular	Plenaria	Ingreso
44	Escobar Nicogossian	Escobar Isaías	1153748931-1130086797	plenaria1,plenaria2,plenaria3,plenaria4	✔️
43	Ávila Isabella	Alicia pino	1138509097	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
42	Herrera bautista	Herrera Cristian	1165960260	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
41	Lunerti Santino	Riveros Andrea	1170012535	plenaria1	Marcar ingreso
40	Baldassini Leizamon	Baldassini Javier/	1136100072/1169043701	plenaria1,plenaria2	Marcar ingreso
39	ROSSO ANNA	Patricia Loureiro,	1132294132	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
38	Gutierrez Julieta	Ana belen	1155931882	plenaria1,plenaria2	Marcar ingreso
37	Gutierrez Zoe	Ana Belen	1155931882	plenaria1,plenaria2	Marcar ingreso
36	Emma Aguirre	Ramón Aguirre,	+5491155736650--+54911567885758	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
35	Delfina Aguirre	Ramón Aguirre,	+5491155736650--+54911567885758	plenaria3,plenaria4,plenaria1,plenaria2	Marcar ingreso
33	García Felipe	García Victor	1568387119	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
34	García Felipe	García Victor	1568387119	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
32	Santiago Rojas	Miriam Balbuena,Mario	1131787961*1155769373	plenaria1,plenaria2	Marcar ingreso
31	Bonahora Sofia	Bonahora Cesar	1128442373;1136744933	plenaria1,plenaria2	Marcar ingreso
30	Leonel Rojas	Miriam Balbuena,Mario	1131787961*1155769373	plenaria1,plenaria2	Marcar ingreso
29	Bonahora Antonella	Bonahora Cesar	1128442373;1136744933	plenaria1,plenaria2	Marcar ingreso
28	Bonahora Sofia	Bonahora Cesar	1128442373;1136744933	plenaria1,plenaria2	Marcar ingreso
27	Gallardo Esteban	Daniel Gallardo	1127943804 / 1127942519	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
26	Eliseo Israel	Melanie Epsztein	1127061648	plenaria1,plenaria2,plenaria3,plenaria4	Marcar ingreso
25	prueba prueba	Pepe Ramirez	+5491163592435	plenaria1,plenaria4	Marcar ingreso
24	Ezequiel Ramos	Ricardo Ramos	1130928598	plenaria1,plenaria2,plenaria3,plenaria4	 */

import 'dotenv/config';
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("❌ Faltan variables TURSO_DATABASE_URL o TURSO_AUTH_TOKEN en .env");
}

const client = createClient({
  url,
  authToken,
});

export default client;
