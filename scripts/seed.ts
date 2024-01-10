const { PrismaClient}  = require('@prisma/client')

const database = new PrismaClient();

async function main() {

    try {

        await database.category.createMany({
            data : [
                {name:'Computer Science'},
                {name:'Music'},
                {name:'Fitness'},
                {name:'Engineering'},
                {name:'Photography'},
                    {name:'Filming'},
                    {name:'Accounting'},
            ]
        });
        console.log('Uploaded data to database')
        
    } catch (error) {
        console.log('Error seeding the database',error)
        
    }
    finally {
        console.log('Disconnected from database')
        await database.$disconnect();
    }
}


main();