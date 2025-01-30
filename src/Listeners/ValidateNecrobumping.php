<?php

/*
 * This file is part of fof/prevent-necrobumping.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\PreventNecrobumping\Listeners;

use Carbon\Carbon;
use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\PreventNecrobumping\Util;
use FoF\PreventNecrobumping\Validators\NecrobumpingPostValidator;
use Illuminate\Support\Arr;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
class ValidateNecrobumping
{
    /**
     * @var NecrobumpingPostValidator
     */
    protected $validator;

    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;

    public function __construct(NecrobumpingPostValidator $validator, SettingsRepositoryInterface $settings)
    {
        $this->validator = $validator;
        $this->settings = $settings;
    }

    public function handle(Saving $event)
    {
        if ($event->post->exists || $event->post->number === 1) {
            return;
        }

        $lastPostedAt = $event->post->discussion->last_posted_at;
        $days = Util::getDays($this->settings, $event->post->discussion);

        if ($lastPostedAt && $days && $lastPostedAt->diffInDays(Carbon::now()) >= $days) {
            $this->validator->assertValid([
                'fof-necrobumping' => Arr::get($event->data, 'attributes.fof-necrobumping'),
            ]);
            // 获取用户实例
            $user = $event->actor;

            // 检查用户能量是否足够
            if ($user->money < 100) {
                throw new PermissionDeniedException('您的能量不足100点，无法进行回复。当前能量：' . $user->money);
            }

            // 扣除能量
            $user->money = $user->money - 100;
            $user->save();
        }
    }
}
