###What is strict query in mongoose
When strict option is set to true , Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent). In simple term, the strict option, ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db. Mongoose supports a separate strictQuery option to avoid strict mode for query filters. This is because empty query filters cause Mongoose to return all documents in the model, which can cause issues.


###fetch in limits 10 10 10 10 10 (like format)
0


Step 1 - Pass limit and skip value in api query like - baseurl/api/v1/apiendpoint?limit=10&skip=0

increment skip by 10 in every page

Step 2 - Fetch limit and skip value from url const limit = req.query.limit; const skip = req.query.skip;

step 3 - const result = student.find().skip(skip).limit(limit);

Note - Limit and skip value will be change as per your click.

#mongoose query 
.select("name email")
only returns name and email
.select("-password") exclude password