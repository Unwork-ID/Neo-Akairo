import req from 'request-promise';

export class Wallpaper {

    async Astolfo() {
            let option = {
                method: "GET",
                url: "https://tokisaki.xyz/api/v1/astolfo",
                json: true
            }
            
            try {
                const res = await req(option)
                return {
                    "data": res
                }
        } catch (e) {
            console.log(e)
        }
    }

    async AstolfoRandom() {
        let option = {
            method: "GET",
            url: "https://tokisaki.xyz/api/v1/astolfo",
            json: true
        }

        try {
            const res = await req(option);
            const random = Math.floor(Math.random() * res.length)
            return {
                "data": res[random].url,
                "uploader": res[random].uploader,
                "time": res[random].uploadTime,
                "uploaderid": res[random].uploaderId
            }
        } catch (error) {
            console.log(error)
        }
    }
}