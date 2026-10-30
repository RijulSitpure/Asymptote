class Solution:
    def countPoints(self, rings: str) -> int:
        rods = [0] * 10
        color_mask = {'R': 1, 'G': 2, 'B': 4}

        for i in range(0, len(rings), 2):
            color = rings[i]
            rod = int(rings[i + 1])
            rods[rod] |= color_mask[color]

        return sum(1 for mask in rods if mask == 7)
