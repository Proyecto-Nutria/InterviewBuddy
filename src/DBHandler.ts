const MongoClient = require('mongodb').MongoClient;
const client = MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });

export class DBHandler
{
    private db;
    private static instance: any;

	private constructor()
    {
		client.connect(err => 
        {
		    if(err) throw err;
			this.db = client.db('InterviewBuddy');
		});
	}
	
    getMail(user)
    {	
		return this.db.collection('mails').findOne({id:user.id});
	}
	
    setMail(user)
    {
		return this.db.collection('mails').findOneAndUpdate({id:user.id}, {$set:user}, {upsert:true});
	}
	end(){client.close();}

    public static getInstance(): DBHandler 
    {
		if (!DBHandler.instance)
            DBHandler.instance = new DBHandler();
		return DBHandler.instance;
	}
}