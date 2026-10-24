from typing import List

class Solution:
    def flipAndInvertImage(self, image: List[List[int]]) -> List[List[int]]:
        n = len(image)
        for row in image:
            for c in range((n + 1) // 2):
                row[c], row[n - 1 - c] = 1 - row[n - 1 - c], 1 - row[c]
        return image

def test():
    sol = Solution()
    img1 = [[1, 1, 0], [1, 0, 1], [0, 0, 0]]
    exp1 = [[1, 0, 0], [0, 1, 0], [1, 1, 1]]
    assert sol.flipAndInvertImage(img1) == exp1, "test 1 failed"
    print("✓ flipping-an-image passed")

if __name__ == "__main__":
    test()
