<?php

namespace App\Mail;

use App\Models\Briefing;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class BriefingReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Briefing $briefing,
        public readonly bool $isConfirmation = false,
    ) {}

    public function envelope(): Envelope
    {
        $subject = $this->isConfirmation
            ? "✅ Hemos recibido tu briefing — {$this->briefing->empresa}"
            : "📋 Nuevo Briefing: {$this->briefing->empresa} — " . now()->format('d/m/Y');

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: $this->isConfirmation
                ? 'emails.briefing-confirmation'
                : 'emails.briefing-received',
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        if ($this->briefing->pdf_path && Storage::disk('public')->exists($this->briefing->pdf_path)) {
            $attachments[] = Attachment::fromStorageDisk('public', $this->briefing->pdf_path)
                ->as('briefing_' . \Str::slug($this->briefing->empresa) . '.pdf')
                ->withMime('application/pdf');
        }

        return $attachments;
    }
}
