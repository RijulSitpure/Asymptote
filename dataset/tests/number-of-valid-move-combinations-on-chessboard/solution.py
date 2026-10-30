class Solution:
    def countCombinations(self, pieces: list[str], positions: list[list[int]]) -> int:
        dir_map = {
            "rook": [(-1, 0), (1, 0), (0, -1), (0, 1)],
            "bishop": [(-1, -1), (-1, 1), (1, -1), (1, 1)],
            "queen": [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
        }
        n = len(pieces)
        pos = [[r - 1, c - 1] for r, c in positions]

        def get_all_moves(piece_type: str, r: int, c: int) -> list[tuple[int, int, int]]:
            moves = [(0, 0, 0)]
            for dr, dc in dir_map[piece_type]:
                for step in range(1, 8):
                    nr, nc = r + dr * step, c + dc * step
                    if 0 <= nr < 8 and 0 <= nc < 8:
                        moves.append((dr, dc, step))
                    else:
                        break
            return moves

        all_moves = [get_all_moves(pieces[i], pos[i][0], pos[i][1]) for i in range(n)]

        def is_compatible(m1: tuple[int, int, int], p1: list[int], m2: tuple[int, int, int], p2: list[int]) -> bool:
            dr1, dc1, s1 = m1
            dr2, dc2, s2 = m2
            max_t = max(s1, s2)
            for t in range(1, max_t + 1):
                r1 = p1[0] + dr1 * min(t, s1)
                c1 = p1[1] + dc1 * min(t, s1)
                r2 = p2[0] + dr2 * min(t, s2)
                c2 = p2[1] + dc2 * min(t, s2)
                if r1 == r2 and c1 == c2:
                    return False
            return True

        count = 0
        current_moves = []

        def backtrack(idx: int) -> None:
            nonlocal count
            if idx == n:
                count += 1
                return

            for move in all_moves[idx]:
                valid = True
                for i in range(idx):
                    if not is_compatible(current_moves[i], pos[i], move, pos[idx]):
                        valid = False
                        break
                if valid:
                    current_moves.append(move)
                    backtrack(idx + 1)
                    current_moves.pop()

        backtrack(0)
        return count
