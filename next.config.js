/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	rewrites() {
		return [
			{
				source: "/:path",
				destination: "/api/:path",
			},
		];
	},
};

module.exports = nextConfig;
