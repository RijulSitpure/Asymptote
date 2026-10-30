class Solution:
    def maxTotalFruits(self, fruits: list[list[int]], startPos: int, k: int) -> int:
        n = len(fruits)
        left = 0
        total_fruits = 0
        max_fruits = 0

        for right in range(n):
            total_fruits += fruits[right][1]

            while left <= right:
                pos_l = fruits[left][0]
                pos_r = fruits[right][0]
                dist = (pos_r - pos_l) + min(abs(startPos - pos_l), abs(startPos - pos_r))
                if dist <= k:
                    break
                total_fruits -= fruits[left][1]
                left += 1

            max_fruits = max(max_fruits, total_fruits)

        return max_fruits
