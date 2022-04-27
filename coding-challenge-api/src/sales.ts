import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

class storeDict { 
    [id : number]: {}
}

/**
 * Function to get the data from orders.csv & stores.csv then parse
 *  it to with the needed data on the frontend 
 * @param req 
 * @param res 
 * @returns {<Array>}
 */
export async function handleOrders(req: any, res: any) { 
    try{
        const orders = await getOrders();
        const stores = await getStores();
        const overdueData = generateOverdueData(orders, stores);
        res.send(overdueData);
    } catch (e) {
        console.log(e);
    }
}

/**
 * To get stores from stores.csv
 * @returns {<Array>} 
 */
async function getStores() {
    const stores: any[] = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve('data/stores.csv'))
        .pipe(csv())
        .on('data', (data) => stores.push(data))
        .on('end', () => {
            const parsedStores = new storeDict();
            for (const storeIndx in stores) {
                const store = stores[storeIndx];
                parsedStores[store.storeId] = store;
            }
            resolve(parsedStores);
        });
    });
}

/**
 * To get orders from orders.csv
 * @returns {<Array>} 
 */
 async function getOrders() {
    const orders: any[] = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve('data/orders.csv'))
        .pipe(csv())
        .on('data', (data) => orders.push(data))
        .on('end', async () => {
            resolve(orders);
        });
    });
    
}

/**
 * To get generate Overdue data for frontend
 * @param orders
 * @param stores
 * @returns {<Array>} 
 */
function generateOverdueData(orders: any, stores: any) {
    const overdueData: any[] = [];
    
    for (const orderIndx in orders){
        const order = orders[orderIndx];
        
        let daysOverdue = 0; //default to 0

        // Get country from destination string
        const splitDestination = order.destination.split(" ");
        const country = splitDestination[1].slice(0,2)
        
        // Calculate days overdue iff shipment_status is Pending
        if (order.shipment_status == 'Pending'){
            const splitDate = order.latest_ship_date.split("/");
            const shipDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]); 
            const currDate = new Date();
            const deltaDate = Math.abs(currDate.getTime() - shipDate.getTime())
            daysOverdue = Math.ceil( deltaDate / (1000 * 60 * 60 * 24)); 
        }
        const overdueRow = {
            marketplace: stores[order.storeId].marketplace,
            store: stores[order.storeId].shopName,
            orderId: order.orderId,
            orderValue: order.orderValue,
            items: order.items,
            destination: order.destination,
            daysOverdue: daysOverdue,
            country: country
        }
        overdueData.push(overdueRow)
    }
    return overdueData;
}
