
using DatabaseConsole;
using Microsoft.Extensions.DependencyInjection;

public class Program
{   
    public static async Task Main(string[] args)
    {
        await GenerateDatabasePrompt();
    }
    
    public static async Task GenerateDatabasePrompt()
    {
        Console.WriteLine("Do you want to setup a local DB? You need to have MongoDb installed in your machine");
        Console.WriteLine("You need to have MongoDb installed in your machine");
        Console.WriteLine("This will add 4 mock users and 25 build orders for each game if the collections are currently empty");
        Console.WriteLine("Type 'y' to accept. Any other key to skip...");
        var setupLocalDB = Console.ReadLine();
      
        
      
        if (setupLocalDB?.ToLower() == "y")
        {
            string? databaseName = "RTSBuildOrderBuilder";
           
            var setupLocalDatabase = new SetupLocalDatabase(databaseName);
            try
            {
                await setupLocalDatabase.SetupLocalDb();
                Console.WriteLine("CREATED DB SUCCESSFULLY!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("There was an error generating the database structure:");
                Console.WriteLine(ex.Message);
            };
            Console.ReadLine();
        }
    }
}
