import { OutputDataStrategy, ShelterAnimalContent } from "./OutputDataStrategy";

import { Kafka,  Producer, Partitioners } from 'kafkajs'
// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "logs"
// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })

export default class KafkaStrategy implements OutputDataStrategy {

    data: ShelterAnimalContent[];
    private producer: Producer
    
    constructor(data: ShelterAnimalContent[]) {
        this.producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
        this.data = data;
    }
    public async output( ):Promise<void> {
         try {
            await this.produce();
          } catch (error) {
            console.log('Error sending messages ', error)
          }
    }

     public async produce() {
        const admin = kafka.admin()
        await admin.connect()
        await this.producer.connect()
        let i = 0
        await admin.createTopics({
          waitForLeaders: true,
          topics: [
            { topic: "message-logs" },
          ],
        })
        
    
        // after the produce has connected, we start an interval timer
        const refreshId= setInterval(async () => {
            try {
                // send a message to the configured topic with
                // the key and value formed from the current value of `i`
                await this.producer.send({
                    topic,
                    messages: [
                        {
                            key: String(i),
                            value: JSON.stringify(this.data[i]),
                        },
                    ],
                })
    
                // if the message is written successfully, log it and increment `i`
                console.log("writes: ", this.data[i])
                if (i<this.data.length) {
                    i++
                }
                else{
                    clearInterval(refreshId);
                    await this.producer.disconnect()
                    await admin.disconnect()
                }
            } catch (err) {
                console.error("could not write message " + err)
            }
        }, 1000)
    }


  
}
 