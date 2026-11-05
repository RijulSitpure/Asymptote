class Solution:
    def minMaxSubarraySum(self, nums: list[int], k: int) -> int:
        n = len(nums)
        
        def compute(is_max: bool) -> int:
            prev_bound = [-1] * n
            next_bound = [n] * n
            stack = []
            for i in range(n):
                if is_max:
                    while stack and nums[stack[-1]] < nums[i]:
                        stack.pop()
                else:
                    while stack and nums[stack[-1]] > nums[i]:
                        stack.pop()
                prev_bound[i] = stack[-1] if stack else -1
                stack.append(i)
            
            stack = []
            for i in range(n - 1, -1, -1):
                if is_max:
                    while stack and nums[stack[-1]] <= nums[i]:
                        stack.pop()
                else:
                    while stack and nums[stack[-1]] >= nums[i]:
                        stack.pop()
                next_bound[i] = stack[-1] if stack else n
                stack.append(i)
                
            total = 0
            for i in range(n):
                l = min(i - prev_bound[i], k)
                r = min(next_bound[i] - i, k)
                extra = max(0, l + r - 1 - k)
                count = l * r - (extra * (extra + 1)) // 2
                total += nums[i] * count
            return total
            
        return compute(True) + compute(False)
