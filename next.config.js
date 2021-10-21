/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	rewrites() {
		return [
			{
				source: "/*",
				destination: "/api/*",
			},
		];
	},
};

module.exports = nextConfig;
