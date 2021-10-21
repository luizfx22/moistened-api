/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	rewrites() {
		return [
			{
				source: "/api",
				destination: "/",
			},
		];
	},
};

module.exports = nextConfig;
