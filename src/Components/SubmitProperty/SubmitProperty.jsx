import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const SubmitProperty = () => {
    return (
        <div>

            <div className="flex flex-col lg:flex-row">


                <div className="lg:w-1/2">
                    <CardMedia
                        component="img"
                        sx={{ width: "100%" }}
                        image="https://i.ibb.co/4RrhDr1/1100-Knollwood-entrance-house-residential-Quita-Cutrer-jpg-optimal.jpg"
                        alt="Live from space album cover"
                    />
                </div>

                <div className="flex flex-col lg:w-1/2 text-center items-center justify-center gap-3">

                    <h2 className="text-3xl font-bold border-b-2 border-[#f2561b]"> SUBMIT PROPERTY</h2>
                    <p>How the adventure ended will be seen anon. Aouda was anxious, though she said nothing. As for Passepartout, he thought Mr. Fogg’s manoeuvre simply glorious. The captain had said “between eleven and twelve knots,” and the Henrietta confirmed his prediction.</p>
                    <button className="bg-[#f2561b] text-white rounded-sm px-4 py-3">Submit Property</button>

                </div>

            </div>

        </div>
    );
};

export default SubmitProperty;