export const albumQueries = {
	readAlbums:`
        SELECT
         id AS albumId, title AS title, artist AS artist, 
         description AS description, year AS year, image AS image 
        FROM music.albums`,
	readAlbumsByArtist:`
        SELECT id AS albumId, title AS title, artist AS artist, 
         description AS description, year AS year, image AS image 
         FROM music.albums
	    WHERE music.albums.artist = ?`,
	readAlbumsByArtistSearch:`
		SELECT id AS albumId, title AS title, artist AS artist, description AS 
         description, year AS year, image AS image 
        FROM music.albums
	    WHERE music.albums.artist like ?`,
	readAlbumsByDescriptionSearch:`
		SELECT id AS albumId, title AS title, artist AS artist, 
         description AS description, year AS year, image AS image 
        FROM music.albums
	    WHERE music.albums.description like ?`,
	readAlbumsByAlbumId:`
		SELECT id AS albumId, title AS title, artist AS artist, 
         description AS description, year AS year, image AS image 
        FROM music.albums
	    WHERE music.albums.id = ?`,
	createAlbum:`
		INSERT into albums(title, artist, description, year, image) values(?,?,?,?,?)`,
	updateAlbum:`
		UPDATE music.albums set title=?, artist=?, year=?, image=?, description=? 
        WHERE id = ?`,
	deleteAlbum:`
		DELETE FROM music.albums 
        WHERE id = ?`,
};
