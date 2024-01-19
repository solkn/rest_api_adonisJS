// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BookMarking from "App/Models/BookMarking";

export default class BookMarkingsController {

    public async getBookMarkings({ request,response}: HttpContextContract)
    {
 
    const { page, perPage } = request.all();


    try {
      const books = await BookMarking.query()
        .paginate(page,perPage)

      response.json({
        books,
        pagination: {
          total: books.total,
          perPage,
          lastPage: books.lastPage,
        }
      });
    } catch (error) {
      response.status(500).json({ message: 'Error fetching books' });
    }

    
    }
    
    public async getBookMarking({ request, params}: HttpContextContract)
    {
        try {
            const bookMarking = await BookMarking.find(params.id);
            if(bookMarking){
            return bookMarking
        }
        } catch (error) {
        	console.log(error)
        }
    }

    public async addBookMarking({ auth, request, response}: HttpContextContract)
    {
        await auth.authenticate();


        const userId = request.input('user_id');
        const bookName = request.input('name')


    try {
      const existingBookmark = await BookMarking.query()
        .where('user_id', userId)
        .where('name', bookName)
        .first();

      if (!existingBookmark) {
        const newBookmark = await BookMarking.create({
          user_id: userId,
          name: bookName
        });

        response.json({ message: 'Book added to bookmarks', bookmark: newBookmark });
      } else {
        response.json({ message: 'Book already bookmarked' });
      }
    } catch (error) {
      response.status(500).json({ message: 'Error adding bookmark' });
    }
  


    }
    
    public async updateBookMarking({ auth, request, params}: HttpContextContract)
    {
        await auth.authenticate();

        const bookMarking = await BookMarking.find(params.id);
        if (bookMarking) {
            bookMarking.name = request.input('name');
            
            if (await bookMarking.save()) {
            	return bookMarking
        	}
        	return; // 422
        }
        return; // 401
    }
    
    public async deleteBookMarking({response, auth, request, params}: HttpContextContract)
    {
        await auth.authenticate();

        const bookMarking = await BookMarking.query().where('id', params.id).delete();
        return response.json({message:"Deleted successfully"})
    }
}