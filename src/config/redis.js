const {createClient}=require('redis');

const client=createClient();

const join=async()=>{
    await client.connect();
}

join();

module.exports=client