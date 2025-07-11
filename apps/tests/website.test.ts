import { describe, it, expect } from "bun:test";
import axios from "axios";


let BASE_URL = "http://localhost:3000";

describe("Website gets created", () => {
    it("Website not created if url is not present", async () => {
        try {
            await axios.post(`${BASE_URL}/website`, {
                
            });
            expect(false, "Website created when it shouldnot");
        } catch(e) {

        }

    })

    it("Website is created if url is present", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            url: "https://google.com"
        });
        expect(response.data.id).not.toBeNull();

    })

    it("Website is updated if url is present", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            url: "https://google.com"
        });
        const response2 = await axios.post(`${BASE_URL}/website`, {
            url: "https://google.com",
            id: response.data.id
        });
        expect(response2.data.id).toBe(response.data.id);

    })
})