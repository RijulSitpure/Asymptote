import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'similar-rgb-color.json')

class Solution:
    def similarRGB(self, color: str) -> str:
        def round_channel(hex_str):
            val = int(hex_str, 16)
            idx = round(val / 17)
            return f"{idx:x}{idx:x}"

        r = round_channel(color[1:3])
        g = round_channel(color[3:5])
        b = round_channel(color[5:7])
        return f"#{r}{g}{b}"

sol = Solution()
assert sol.similarRGB("#09f166") == "#11ee66"
assert sol.similarRGB("#4e3fe1") == "#5544dd"
print("✓ similar-rgb-color passed")
