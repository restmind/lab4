import { Kafka,  Consumer } from 'kafkajs'
// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "message-logs"
// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })

export default class ExampleConsumer {
  private consumer: any 

  public constructor( ) { 
    this.consumer = kafka.consumer({ groupId: clientId })
  }
  
    public  async consume() {
    // first, we wait for the client to connect and subscribe to the given topic
    await this.consumer.connect()
    await this.consumer.subscribe({ topic })
    await this.consumer.run({
      // this function is called every time the consumer gets a new message
      eachMessage: ({ message }:any) => {
        // here, we just log the message to the standard output
        console.log(`received message: ${message.value}`)
      },
    })
  }

}

const consumer = new ExampleConsumer();
consumer.consume();