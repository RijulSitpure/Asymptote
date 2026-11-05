class Solution:
    def separateSquares(self, squares: list[list[int]]) -> float:
        total_area = sum(l * l for _, _, l in squares)
        target = total_area / 2.0
        
        low = min(y for _, y, _ in squares)
        high = max(y + l for _, y, l in squares)
        
        for _ in range(60):
            mid = (low + high) / 2.0
            area_below = 0.0
            for _, y, l in squares:
                if mid >= y + l:
                    area_below += l * l
                elif mid > y:
                    area_below += l * (mid - y)
            if area_below < target:
                low = mid
            else:
                high = mid
                
        return high
