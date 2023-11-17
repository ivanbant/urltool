import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import Click from "../models/clickModel.js";
// @desc    Reroute Url
// @route   GET /api/urls/route/:urlId
// @access  Public
const routeUrl = asyncHandler(async (req, res) => {
  const ip = getIp(req);
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      url.clicks += 1;
      await url.save();

      const click = new Click({
        user: url.user ? url.user.toString() : null,
        url: url._id,
        ipv4: ip.ip,
        codedIpv4: ip.codedIpv4,
      });
      await click.save();
      return res.redirect(url.originalUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

function getIp(req) {
  let ip =
    (req.headers["x-forwarded-for"] || "").split(",").shift() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // Regular expression for IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // Simplified regular expression for IPv6 (also matches IPv4-mapped IPv6 addresses)
  const ipv6Regex = /^(\:?(:ffff\:)?(\d{1,4}\:)*){1,4}(\d{1,3}\.){3}\d{1,3}$/;

  // Check for IPv4-mapped IPv6 addresses first
  if (ipv6Regex.test(ip)) {
    if (ip.includes("::ffff:")) {
      ip = ip.substring(ip.lastIndexOf(":") + 1); // Extract the IPv4 part
      return { type: "ipv4", ip: ip, codedIpv4: translateIpv4(ip) };
    }
    return { type: "ipv6", ip: ip }; // Handle standard IPv6 addresses
  }

  // Check if the IP is IPv4
  if (ipv4Regex.test(ip)) {
    return { type: "ipv4", ip: ip, codedIpv4: translateIpv4(ip) };
  }

  // If the IP doesn't match IPv4 or IPv6 formats
  return { type: "unknown", ip: null, codedIpv4: null };
}

const translateIpv4 = (ipv4) => {
  const splitIp = ipv4.split(".").map((num) => parseInt(num));
  // Translated IP = 16777216*w + 65536*x + 256*y + z where IP Address = w.x.y.z
  return (
    16777216 * splitIp[0] + 65536 * splitIp[1] + 256 * splitIp[2] + splitIp[3]
  );
};

export { routeUrl };
