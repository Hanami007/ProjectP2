<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function topup(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = Auth::user();
        $user->wallet_balance += $request->amount;
        $user->save();

        return redirect()->back()->with('success', 'เติมเงินเรียบร้อยแล้ว');
    }

    public function showTopupForm()
    {
        return Inertia::render('Payment/Wallet', [
            'user' => Auth::user(),
        ]);
    }
}
