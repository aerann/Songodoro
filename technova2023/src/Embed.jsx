export default function Embed(playlistID){
    console.log('ultimate test', playlistID)
    return(
        
        <div>
            <iframe src={`https://open.spotify.com/embed/album/${playlistID}?utm_source=generator`} width="100%" height="100%" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    )
}