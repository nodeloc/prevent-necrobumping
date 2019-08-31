<?php

/*
 * This file is part of fof/prevent-necrobumping.
 *
 * Copyright (c) 2018 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoF\PreventNecrobumping;

use Flarum\Extend as Vanilla;
use Flarum\Post\Event\Saving;
use FoF\Extend\Extend;
use Illuminate\Events\Dispatcher;

return [
    (new Vanilla\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Vanilla\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    new Vanilla\Locales(__DIR__.'/resources/locale'),
    (new Extend\ExtensionSettings())
        ->setPrefix('fof-prevent-necrobumping.')
        ->addKeys(['days', 'message.title', 'message.description', 'message.agreement']),
    function (Dispatcher $events) {
        $events->listen(Saving::class, Listeners\ValidateNecrobumping::class);
    },
];
