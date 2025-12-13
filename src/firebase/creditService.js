import { db } from './config'; 

import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

const productsCollection = collection(db, "productos_crediticios");
const requestsCollection = collection(db, "solicitudes_credito");

export const getCreditProducts = async () => {
  try {
    const data = await getDocs(productsCollection);
    
    const products = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id 
    }));
    
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("No se pudieron cargar los productos crediticios. Verifique la conexión.");
  }
};

export const createCreditRequest = async (requestData) => {
  try {
    const docRef = await addDoc(requestsCollection, {
      ...requestData,
      estado: 'Pendiente', 
      fechaSolicitud: new Date().toISOString() 
    });
    
    return docRef.id; 
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    throw new Error(`Error al guardar la solicitud: ${error.message}`);
  }
};


export const getMyRequests = async (userEmail) => {
  try {
    const q = query(
      requestsCollection, 
      where("email", "==", userEmail), 
      orderBy("fechaSolicitud", "desc") 
    );

    const querySnapshot = await getDocs(q);
    
    const requests = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    
    return requests;
  } catch (error) {
    console.error("Error al obtener mis solicitudes:", error);
    throw new Error("Error al obtener las solicitudes del usuario.");
  }
};