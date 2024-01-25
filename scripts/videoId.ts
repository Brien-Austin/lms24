type ytProps= {
    url : string 
}
export async  function getYouTubeVideoId({url} : ytProps) {
    const match =  url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/);
    return match && match[1] ? match[1] : null;
  }