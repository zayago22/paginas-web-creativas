<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Testimonial;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_leads' => Lead::count(),
                'new_leads' => Lead::new()->count(),
                'leads_this_month' => Lead::thisMonth()->count(),
                'total_projects' => Project::active()->count(),
                'total_posts' => BlogPost::published()->count(),
                'total_testimonials' => Testimonial::active()->count(),
            ],
            'recentLeads' => Lead::recent()->limit(10)->get()->map(fn($l) => [
                'id' => $l->id,
                'name' => $l->name,
                'email' => $l->email,
                'service_interest' => $l->service_interest,
                'source' => $l->source,
                'status' => $l->status,
                'status_label' => $l->status_label,
                'status_color' => $l->status_color,
                'created_at' => $l->created_at->diffForHumans(),
            ]),
        ]);
    }
}
