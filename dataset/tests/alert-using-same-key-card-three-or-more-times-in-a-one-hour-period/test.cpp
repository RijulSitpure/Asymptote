#include <cassert>
#include <vector>
#include <string>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<std::string> n1 = {"daniel","daniel","daniel","luis","luis","luis","luis"};
    std::vector<std::string> t1 = {"10:00","10:40","11:00","09:00","11:00","13:00","15:00"};
    std::vector<std::string> exp1 = {"daniel"};
    assert(sol.alertNames(n1, t1) == exp1);
    return 0;
}