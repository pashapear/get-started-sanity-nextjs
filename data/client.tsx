import { createClient } from "next-sanity";

export default createClient({
	projectId: "923bgilp",
	dataset: "production",
	apiVersion: "2023-09-08",
	useCdn: false
});
