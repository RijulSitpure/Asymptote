class Solution:
    def minDifference(self, nums: list[int]) -> int:
        n = len(nums)
        min_diff = 0
        for i in range(n - 1):
            if nums[i] != -1 and nums[i + 1] != -1:
                min_diff = max(min_diff, abs(nums[i] - nums[i + 1]))
                
        adj = []
        for i in range(n):
            if nums[i] == -1:
                continue
            if (i > 0 and nums[i - 1] == -1) or (i < n - 1 and nums[i + 1] == -1):
                adj.append(nums[i])
                
        if not adj:
            return min_diff
            
        min_v = min(adj)
        max_v = max(adj)
        
        def check(d):
            if d < min_diff:
                return False
            x = min_v + d
            y = max_v - d
            if x > y:
                x = y = (min_v + max_v) // 2
                
            i = 0
            while i < n:
                if nums[i] == -1:
                    start = i
                    while i < n and nums[i] == -1:
                        i += 1
                    end = i
                    left_val = nums[start - 1] if start > 0 else None
                    right_val = nums[end] if end < n else None
                    
                    can_x = (left_val is None or abs(left_val - x) <= d) and (right_val is None or abs(right_val - x) <= d)
                    can_y = (left_val is None or abs(left_val - y) <= d) and (right_val is None or abs(right_val - y) <= d)
                    can_xy = (end - start >= 2) and (abs(x - y) <= d) and (
                        ((left_val is None or abs(left_val - x) <= d) and (right_val is None or abs(right_val - y) <= d)) or
                        ((left_val is None or abs(left_val - y) <= d) and (right_val is None or abs(right_val - x) <= d))
                    )
                    if not (can_x or can_y or can_xy):
                        return False
                else:
                    i += 1
            return True
            
        low = min_diff
        high = max_v - min_v
        ans = high
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans
