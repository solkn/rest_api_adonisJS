// // import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { google } = require('googleapis');
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BookSearchingsController {

    public async searchBooks({ request,response}: HttpContextContract){

        const api_key = "AIzaSyC4dCTNmtozDakRD4MydXiuoUZlHe3rB1A"
  
        const { query, page, perPage } = request.all();
      
        const booksApi = google.books({ version: 'v1', auth: api_key });


        try {

        const responseData = await booksApi.volumes.list({
            q: query,
            startIndex: (page - 1) * perPage,
            maxResults: perPage,
          });
    
          if (responseData.status === 200) {
            const books = responseData.data.items.map((item) => {
              // Map returned data to your desired format
              return {
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors,
                thumbnail: item.volumeInfo.imageLinks?.smallThumbnail,
              };
            });
    
            response.json({
              books,
              totalPages: Math.ceil(responseData.data.totalItems / perPage),
              currentPage: page,
              perPage,
              total: responseData.data.totalItems,
            });
          } else {
            response.status(500).json({ message: 'Error fetching books from Google Books API' });
          }
        } catch (error) {
          response.status(500).json({ message: 'Error searching books' });
        }

       

      }
      
}

