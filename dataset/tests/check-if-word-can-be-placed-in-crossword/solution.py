class Solution:
    def placeWordInCrossword(self, board: list[list[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        k = len(word)
        rev_word = word[::-1]
        
        def match(seg: str) -> bool:
            if len(seg) != k:
                return False
            forward = all(seg[i] == ' ' or seg[i] == word[i] for i in range(k))
            backward = all(seg[i] == ' ' or seg[i] == rev_word[i] for i in range(k))
            return forward or backward
            
        for row in board:
            for seg in ''.join(row).split('#'):
                if match(seg):
                    return True
                    
        for c in range(n):
            col_str = ''.join(board[r][c] for r in range(m))
            for seg in col_str.split('#'):
                if match(seg):
                    return True
                    
        return False
