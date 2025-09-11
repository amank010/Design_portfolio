#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <climits>
#include <algorithm>
#include <set>
using namespace std;

// int GetMinimumCost(int N, vector<int> A)
// {
//     int minCost=0;
    
//     return minCost;
    
// }

int main()
{
    // ios::sync_with_stdio(false);
    // cin.tie(nullptr);

    // int N;
    // cin >> N;
    // vector<int> A(N);
    // for (int i = 0; i < N; ++i)
    // {
    //     cin >> A[i];
    // }

    // cout << GetMinimumCost(N, A) << endl;
    // return 0;

    int n;
    cin>>n;

    //if given number is odd then like 1? then false
    //if given is 2 then also false as 2 will be divided in 1 and 1 which are odd so false
    //if 3 then it can be divided into 2, and 1 which are not both even so false
    //if 4 then it can be divided into 2 and 2 which are both even so true
    // if 5 then 1,4 or 2,3 or 3,2 or 4,1 which are all odd so false
    if(n%2!=0) cout<<"NO";
    for(int i=1;i<n;i++){
            if( i%2==0 && (n-i)%2 == 0){
                cout<<"YES";
            }
    }
}
