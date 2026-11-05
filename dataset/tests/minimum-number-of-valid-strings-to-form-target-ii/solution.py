class Solution:
    def minValidStrings(self, words: list[str], target: str) -> int:
        n = len(target)
        max_jump = [0] * n
        
        # For each word, compute KMP pi-array of (word + '#' + target)
        # to find longest prefix of word matching starting at each position in target
        for w in words:
            s = w + '#' + target
            m = len(w)
            total_len = len(s)
            pi = [0] * total_len
            j = 0
            for i in range(1, total_len):
                while j > 0 and s[i] != s[j]:
                    j = pi[j - 1]
                if s[i] == s[j]:
                    j += 1
                pi[i] = j
                
            # For characters in target, update max_jump for the start index
            # s[m + 1 + k] corresponds to target[k]
            # pi[m + 1 + k] is match length ending at target[k]
            # So start index is k - match_len + 1
            for k in range(n):
                match_len = pi[m + 1 + k]
                if match_len > 0:
                    start_idx = k - match_len + 1
                    if match_len > max_jump[start_idx]:
                        max_jump[start_idx] = match_len
                        
        # Propagate: if at start_idx we have match_len, then at start_idx + 1 we can match at least match_len - 1
        for i in range(n - 1):
            if max_jump[i] - 1 > max_jump[i + 1]:
                max_jump[i + 1] = max_jump[i] - 1
                
        # Jump Game BFS greedy traversal
        jumps = 0
        curr_end = 0
        farthest = 0
        
        for i in range(n):
            if i + max_jump[i] > farthest:
                farthest = i + max_jump[i]
            if i == curr_end:
                if farthest == curr_end:
                    return -1
                jumps += 1
                curr_end = farthest
                if curr_end >= n:
                    return jumps
                    
        return jumps if curr_end >= n else -1
