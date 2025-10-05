import { showNotification } from "@mantine/notifications";

export const ErrorNotification = (msg) =>{


     showNotification({ message: msg , color: 'red' });



}