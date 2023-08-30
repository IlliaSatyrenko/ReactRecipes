import { Box } from "@mui/material";

const Video = ({ videoId }: any) => {
    console.log(videoId);
    const videoUrl = "https://www.youtube.com/embed/" + videoId;

    return (
        <Box height="100%">
            <iframe
                title="video-player"
                width="100%"
                height="100%"
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
            />
        </Box>
    );
};

export default Video;
